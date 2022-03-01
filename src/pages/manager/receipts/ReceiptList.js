import React, { useEffect, useState } from 'react';
import { TablePagination, Button, FlexTable, Modal } from '../../../atoms';
import { title } from './receiptTableData';
import { generatePDF } from './../../../helper/functions'
import { SearchReceipt, Receipt } from './index'
import PageSize from '../../../molecules/PageSize';
import './List.css';
import {
  useReceipts,
  usePagination,
  useCustomers,
  useSearch, 
  useModal
} from './../../../redux/hooks';

const List = () => {
  //State
  const [sortDir, setSortDir] = useState('asc')
  const [activeField, setActiveField] = useState('')

  //Redux Hooks
  const { receipts, getReceipts, error, pending, count } = useReceipts();
  const { getCustomers } = useCustomers();
  const { activePage, pageSize, pageOfItems, setPageItems, setPage } = usePagination();
  const {
    isActive,
    filtered,
    setLocationChanged,
    setSearch,
    searchTerm,
    searchCount
  } = useSearch();
  const { isModalOpen, modalHeading, modalType, setModalShow, setModalClose, id } = useModal()

  useEffect(() => {
    setLocationChanged();
  }, [setLocationChanged]);

  // Fetch all customers
  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  // Fetch receipts per page to populate Redux store
  useEffect(() => {
    const skip = (activePage - 1) * pageSize;
    const limit = pageSize;
    !filtered.length && getReceipts(skip, limit);
  }, [pageSize, getReceipts, filtered, activePage]);

  useEffect(() => {
    const skip = (activePage - 1) * pageSize;
    const limit = pageSize;
    isActive === 'searchReceiptsByName' &&
      setSearch(searchTerm, searchTerm, 'searchReceiptsByName', skip, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, pageSize, setSearch]);

  // Check error state and notify
  useEffect(() => {
    if (error.msg === 'Unauthorized' && error.status === 401) {
      window.location.reload(true);
    }
  }, [error]);

  //Modal Handlers
  const handleShow = (type, id) =>{
    if(type === 'View') {
      setModalShow({
        modalHeading: `${type} Receipt Page`,
        modalType: type,
        id
      });
      return 
    }
      setModalShow({
        modalHeading: `${type} Receipt Page`,
        modalType: type,
        id
      });
  };

  // Icon Handlers
  const handleClick = async (e, icon, id) => {
    switch (icon) {
      case 'Edit':
        handleShow('Update', id);
        break;
      case 'Eye':
        handleShow('View', id);
        break;
      case 'Print':
        generatePDF(receipts, id);
        break;
      default:
        break;
    }
  };

  //Sort 
  const handleSort = (fieldName) => {
    
    const skip = (activePage - 1) * pageSize;
    const limit = pageSize;
    let sort
    let dir
    (activeField !== fieldName) ? dir = 'asc' : dir = sortDir
    const nestedFields = ['customer', 'branch', 'receivedBy','paymentType', 'paymentReason', 'createdBy']
    if(nestedFields.includes(fieldName)) {
      sort = `${fieldName}.name`
    } else {
      sort = fieldName
    }    
    if(activeField !== fieldName) setSortDir('asc')
    setActiveField(fieldName)
    getReceipts(skip, limit, sort, dir);
    if(sortDir === 'asc') {
      setSortDir('desc')
    } else{
      setSortDir('asc')
    }
  }

  const modalProps = {
    id,
    description: modalType,
    handleShow
  }

  return (
    <>     
      <Modal 
        body={<Receipt {...modalProps} />} 
        isOpen={isModalOpen}
        heading={modalHeading}
        onHide={setModalClose}
      />

      <div>
        {
          <div className="receipt-list-wrapper d-flex flex-column">
            <div className="receipt-list-bar d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <PageSize />
                <div className="d-flex align-items-center search-by-id">
                  <SearchReceipt
                    iconId="receipt-search-by-id-icon"
                    inputId="search-receipt-by-id-input"
                    placeholder="# Receipt"
                    searchType="searchReceiptsById"
                  />
                </div>
                <div className="d-flex align-items-center search-by-name">
                  <SearchReceipt
                    iconId="receipt-search-by-name-icon"
                    inputId="search-receipt-by-name-input"
                    placeholder="Search by Name"
                    searchType="searchReceiptsByName"
                  />
                </div>
              </div>

              <div>
                <Button
                  text="Add Receipt"
                  variant="info"
                  onClick={() => handleShow('Add')}
                  className="ml-auto"
                  id={'list-add-receipt-button'}
                />
              </div>
            </div>
            <FlexTable
              tableType="receipt"
              data={receipts.length ? pageOfItems : []}
              titleData={title}
              iconClick={(e, icon, id) => handleClick(e, icon, id)}
              tableId={'receipt-list-flex-table'}
              subtableId={'receipt-list-flex-subtable'}
              pending={pending}
              activePage={activePage}
              pageSize={pageSize}
              handleSort={handleSort}
            />
            <TablePagination
              paginationType="server"
              itemsLength={
                (isActive === 'searchReceiptsById' ||
                  isActive === 'searchReceiptsByName') &&
                searchCount
                  ? searchCount
                  : count
              }
              id={'receipt-list-pagination'}
              items={
                (isActive === 'searchReceiptsById' ||
                  isActive === 'searchReceiptsByName') &&
                searchCount
                  ? filtered
                  : receipts
              }
              onChangePage={setPageItems}
              activePagehandler={setPage}
              pageSize={pageSize}
              activePage={activePage}
              isSearchActive={isActive}
              paginationClass="customer-pagination d-flex justify-content-center align-items-center"
            />
          </div>
        }
        {error.length ? 'Something went wrong, try again' : ''}
      </div>
    </>
  );
};

export default List;
