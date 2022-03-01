import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUsers, usePagination, useConfirmationModal, useModal, useSearch } from '../../redux/hooks';
import { FlexTable, TablePagination, Button, Modal, ConfirmationModal, ShowHideButton } from '../../atoms';
import UserModal from './UserModal'
import { handleShowHideButtonOnClick } from '../../helper/functions'
import PageSize from '../../molecules/PageSize'
import Search from './Search'

export const title = [
  {
    title: 'First Name',
    fieldName: 'firstName',
    className: 'col-3 col-xs-3'
  },
  {
    title: 'Last Name',
    fieldName: 'lastName',
    className: 'col-3 col-xs-3'
  },
  {
    title: 'Email',
    fieldName: 'email',
    className: 'col-3 col-xs-3'
  },
  {
    title: 'Branch',
    fieldName: 'branch',
    className: 'col-3 col-xs-3'
  },
  {
    title: '',
    fieldName: 'icon',

    icons: ['Edit', 'TrashAlt'],
    className: 'col-3 col-xs-3'
  }
];

const Users = () => {
  const location = useLocation();
  //Hooks
  const { users, getUsers, sortUsers, error, deleteUser, pending } = useUsers();
  const [filteredUsers, setUsers] = useState([])
  const {
    activePage,
    pageSize = 10,
    pageOfItems,
    setPageItems,
    setPage
  } = usePagination();
  const { filtered, isActive, searchTerm, setSearch, setLocationChanged } = useSearch();
  //State 
  const [data, setData] = useState('')
  const [sortDir, setSortDir] = useState('asc')
  const [activeField, setActiveField] = useState('')

  //Modal States
  const { isModalOpen, modalHeading, setModalShow, setModalClose } = useModal()
  const { isConfirmationOpen, confirmationHeading, confirmationType, id, setConfirmationModalShow,  setConfirmationModalClose } = useConfirmationModal()

  // Fetch all users to populate Redux store
  useEffect(() => {
    filteredUsers.length < 1 && getUsers();
  }, [filteredUsers, getUsers]);
  
  // Check error state and notify
  useEffect(() => {
    if (error.msg === 'Unauthorized' && error.status === 401) {
      window.location.reload(true);
    }
  }, [error]);

  //Show-Hide deleted customers
  const [show, setShow] = useState(false)
  useEffect(() => {
    const data = handleShowHideButtonOnClick(users, show)
    setUsers(data)
  }, [show, users])

  useEffect(() => {
    searchTerm && setSearch(searchTerm, filteredUsers, 'searchManager');
  }, [filteredUsers, searchTerm, setSearch]);

  useEffect(() => {
    setLocationChanged();
  }, [location, setLocationChanged]);

  //handle Button OnClick Event
  const handleOnClick = (type, id) => (e) => {
    e.preventDefault()
    switch(type) {
      case 'add': 
        setModalShow({modalHeading: 'Add User', modalType: 'add'})
        break
      case 'delete':
        setConfirmationModalShow({
          confirmationType: 'Delete',
          confirmationHeading: 'Delete User',
          id: id
        });
        break
      case 'update':
        setData( users.find(e => e.id === id))
        setModalShow({modalHeading: 'Update User', modalType: 'update'})
        break
      default:
        break
    }
  }

  // Icon Handlers
  const handleClick = async (e, icon, id) => {
    switch (icon) {
      case 'TrashAlt':
        handleOnClick('delete', id)(e)        
        break;
      case 'Edit':
        handleOnClick('update', id)(e);
        break;
      default:
        break;
    }
  };

  const handleDelete = (id) => {
    deleteUser(id);
    setConfirmationModalClose();
  };

  //Sort
  const handleSort = (fieldName) => {
    let dir
    (activeField !== fieldName) ? dir = 'asc' : dir = sortDir
    setActiveField(fieldName)    
    sortUsers(fieldName, dir)

    if(sortDir === 'desc') {
      setSortDir('asc')
    } else{
      setSortDir('desc')
    }
    const data = handleShowHideButtonOnClick(users, show)
    setUsers(data)
  }

  const modalProps = {
    data
  }
  
  return (
    <>
     <Modal
        isOpen={isModalOpen}
        heading={modalHeading}
        onHide={setModalClose}
        body={<UserModal {...modalProps} />}
      />
       {confirmationType === 'Delete' && <Modal
       body={<ConfirmationModal modalHeading={confirmationHeading} onClick={() => handleDelete(id)} variant={'danger'} />}
       isOpen={isConfirmationOpen}
       heading={confirmationHeading}
       onHide={setConfirmationModalClose}
      />}
    <div className="col-12" style={{ margin: '0px auto' }}>
      <div >
        <div className="manager-list-bar d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-between align-items-center">
            <PageSize />
            <Search />
            <ShowHideButton handleShowHideButtonOnClick={() => setShow(!show)} name='Managers' />
          </div>
          <div>
          <Button
            text="Add Manager"
            variant="info"
            onClick={(e) => handleOnClick('add')(e)}
            className="ml-auto"
            id={'list-add-user-button'}
            />
          </div>
         
        </div>
      </div>
      <FlexTable
        tableType="manager"
        data={pageOfItems}
        titleData={title}
        iconClick={(e, icon, id) => handleClick(e, icon, id)}
        tableId={'manager-list-flex-table'}
        pending={pending}
        activePage={activePage}
        pageSize={pageSize}
        handleSort={handleSort}
      />
      <TablePagination
        paginationType="client"
        id={'customer-list-pagination'}
        items={isActive === 'searchManager' ? filtered : filteredUsers}
        onChangePage={setPageItems}
        activePagehandler={setPage}
        pageSize={pageSize}
        activePage={activePage}
        isSearchActive={isActive}
        paginationClass="customer-pagination d-flex justify-content-center align-items-center"
      />
    </div>
    </>
  );
};

export default Users;
