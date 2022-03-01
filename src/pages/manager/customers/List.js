import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  TablePagination,
  Button,
  Modal,
  FlexTable,
  ShowHideButton,
  ConfirmationModal
} from '../../../atoms';
import SearchCustomer from './SearchCustomer';
import PageSize from '../../../molecules/PageSize';
import './List.css';
import { title, subTitle } from './customerTableData';
import { Receipt } from './../receipts/index';
import { handleShowHideButtonOnClick } from '../../../helper/functions'
import {
  useCustomers,
  useSearch,
  usePagination,
  useConfirmationModal,
  useModal
} from './../../../redux/hooks';

const List = () => {
  const history = useHistory();
  const location = useLocation();
  const [customers, setCustomers] = useState([])

  //State 
  const [sortDir, setSortDir] = useState('asc')
  const [activeField, setActiveField] = useState('firstName')

  //Redux Hooks
  const {
    customers : customer,
    getCustomers,
    deleteCustomer,
    getCustomerReceipts,
    sortCustomers,
    error,
    customerReceipts,
    customerSubtableID,
    pending
  } = useCustomers();
  const { filtered, isActive, searchTerm, setSearch, setLocationChanged } = useSearch();
  const { activePage, pageSize, pageOfItems, setPageItems, setPage } = usePagination();
  const {
    isModalOpen,
    modalHeading,
    modalType,
    setModalShow,
    setModalClose,
    id
  } = useModal();
  const {
    isConfirmationOpen,
    confirmationHeading,
    confirmationType,
    id: confirmationId,
    setConfirmationModalShow,
    setConfirmationModalClose
  } = useConfirmationModal();

  useEffect(() => {
    setLocationChanged();
  }, [location, setLocationChanged]);

  // Fetch all customers to populate Redux store
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  // Check error state and notify
  useEffect(() => {
    if (error.msg === 'Unauthorized' && error.status === 401) {
      window.location.reload(true);
    }
  }, [error]);

  //Show-Hide deleted customers
  const [show, setShow] = useState(false)
  useEffect(() => {
   const data = handleShowHideButtonOnClick(customer, show)
   setCustomers(data)
  }, [show, customer])

  useEffect(() => {
    searchTerm && setSearch(searchTerm, customers, 'searchCustomers');
  }, [customers, searchTerm, setSearch]);

  // Icon Handlers
  const handleClick = (e, icon, id) => {
    switch (icon) {
      case 'FileInvoice':
        setModalShow({
          modalType: 'View',
          modalHeading: 'View Receipt Page',
          id: id
        });
        break;
      case 'Eye':
        history.push({ pathname: `/manager/customers/${id}` });
        break;
      case 'Edit':
        history.push({ pathname: `/manager/customers/${id}/edit` });
        break;
      case 'addCustomer':
        history.push({ pathname: '/manager/customers/add-customer' });
        break;
      case 'Receipt':
        customerSubtableID.indexOf(id) > -1
          ? getCustomerReceipts(id, 'close')
          : getCustomerReceipts(id, 'open');
        break;
      case 'TrashAlt':
        setConfirmationModalShow({
          confirmationType: 'Delete',
          confirmationHeading: 'Delete Customer',
          id: id
        });
        break;
      default:
        break;
    }
  };

  const handleDelete = (id) => {
    deleteCustomer(id);
    setConfirmationModalClose();
  };

  //Sort
  const handleSort = (fieldName) => {
    let dir
    (activeField !== fieldName) ? dir = 'asc' : dir = sortDir
    setActiveField(fieldName)    
    sortCustomers(fieldName, dir)

    if(sortDir === 'desc') {
      setSortDir('asc')
    } else{
      setSortDir('desc')
    }
    const data = handleShowHideButtonOnClick(customer, show)
    setCustomers(data)
  }

  const modalProps = {
    id,
    description: modalType
  };

  return (
    <>
      <Modal
        body={<Receipt {...modalProps} />}
        isOpen={isModalOpen}
        heading={modalHeading}
        onHide={setModalClose}
      />
      {confirmationType === 'Delete' && (
        <Modal
          body={
            <ConfirmationModal
              modalHeading={confirmationHeading}
              onClick={() => handleDelete(confirmationId)}
              variant={'danger'}
            />
          }
          isOpen={isConfirmationOpen}
          heading={confirmationHeading}
          onHide={setConfirmationModalClose}
        />
      )}
      <div>
        <>
          {
            <div className="customer-list-wrapper d-flex flex-column">
              <div className="customer-list-bar d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-between align-items-center">
                  <PageSize />
                  <SearchCustomer />
                  <ShowHideButton handleShowHideButtonOnClick={() => setShow(!show)} name='Customers' />
                </div>

                <div>
                  <Button
                    text="Add Customer"
                    variant="info"
                    onClick={(e) => handleClick(e, 'addCustomer')}
                    className="ml-auto"
                    id={'list-add-customer-button'}
                  />
                </div>
              </div>
              <FlexTable
                tableType="customer"
                data={pageOfItems}
                titleData={title}
                iconClick={(e, icon, id) => handleClick(e, icon, id)}
                subTableIDs={customerSubtableID}
                subTableData={customerReceipts}
                subTitleData={subTitle}
                tableId={'customer-list-flex-table'}
                subtableId={'customer-list-flex-subtable'}                
                pending={pending}
                activePage={activePage}
                pageSize={pageSize}
                handleSort={handleSort}
              />
              <TablePagination
                paginationType="client"
                id={'customer-list-pagination'}
                items={isActive === 'searchCustomers' ? filtered : customers}
                onChangePage={setPageItems}
                activePagehandler={setPage}
                pageSize={pageSize}
                activePage={activePage}
                isSearchActive={isActive}
                paginationClass="customer-pagination d-flex justify-content-center align-items-center"
              />
            </div>
          }
        </>
      </div>
    </>
  );
};

export default List;
