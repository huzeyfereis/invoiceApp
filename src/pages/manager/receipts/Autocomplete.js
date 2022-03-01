import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { Input, Button } from '../../../atoms';
import CustomerView from './../customers/CustomerView';
import './Autocomplete.css';

const Autocomplete = ({
  selections = [],
  description,
  formikOnchange,
  formikError,
  formikTouched,
  formikSetFieldTouched,
  value
}) => {
  const [activeSelection, setActiveSelection] = useState(0);
  const [filteredSelections, setFilteredSelections] = useState([]);
  const [showSelections, setShowSelections] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const dropRef = useRef();
  const wrapperRef = useRef(null)
  const history = useHistory();
  //Modal States
  const [show, setShow] = useState(false);
  const [modalSelection, setModalSelection] = useState({});
  const handleModal = (selection) => (e) => {
    e.persist();
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    setShow(true);
    setModalSelection(selection);
  };

  useEffect(() => {
    setFilteredSelections(selections)
  }, [selections])

  useEffect(() => {
    if (
      inputValue.trim() === '' ||
      (inputValue && showSelections && !filteredSelections.length)
    ) {
      formikOnchange('customer', { id: '', name: '' });
    }
  }, [filteredSelections.length, formikOnchange, inputValue, showSelections]);

  useEffect(() => {
    if (value) {
      setInputValue(value.name);
      formikOnchange('customer', { id: value.id, name: value.name });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (e) => {
    const { current: wrap } = wrapperRef
    if(wrap && !wrap.contains(e.target)) setShowSelections(false) 
  }
  const handleChange = (e = ' ') => {
    const userInput = e.currentTarget.value;

    const sortByTerm = (data, term) => {
      return data.sort((a, b) => {
        return a.firstName.indexOf(term) < b.firstName.indexOf(term) ? -1 : 1;
      });
    };

    const filteredSelections = sortByTerm(
      selections,
      userInput.toLowerCase()
    ).filter((selection) =>
      (selection.firstName + ' ' + selection.lastName)
        .toLowerCase()
        .includes(userInput.toLowerCase())
    );

    setActiveSelection(0);
    setFilteredSelections(filteredSelections);
    selections.length && setShowSelections(true);
    setInputValue(userInput);

    if (dropRef && dropRef.current) {
      dropRef.current.scrollTop = 0;
    }
  };

  const handleClick = (selection) => (e) => {
    setActiveSelection(0);
    setFilteredSelections([]);
    setShowSelections(false);
    setInputValue(selection.firstName + ' ' + selection.lastName);
    formikOnchange('customer', { id: selection.id, name: inputValue });
  };

  const handleKeyDown = (e) => {
    // pressed enter key
    if (e.keyCode === 13) {
      if (filteredSelections?.length) {
        setInputValue(
          filteredSelections[activeSelection]?.firstName +
            ' ' +
            filteredSelections[activeSelection]?.lastName
        );
        setShowSelections(false);
        formikOnchange('customer', {
          id: filteredSelections[activeSelection]?.id,
          name: inputValue
        });
      }
    }
    // pressed up arrow
    else if (e.keyCode === 38) {
      if (activeSelection === 0) {
        return;
      }
      dropRef.current.scrollTop -= 37;
      setActiveSelection(activeSelection - 1);
    }
    // pressed down arrow
    else if (e.keyCode === 40) {
      if (
        activeSelection - 1 === filteredSelections.length ||
        activeSelection + 1 >= filteredSelections.length
      ) {
        return;
      }
      dropRef.current.scrollTop += 37;
      setActiveSelection(activeSelection + 1);
    }
  };

  return (
    <div ref={wrapperRef}>
      <Input
        label="Customer Name"
        id={`customerFullname-${description}`}
        size="sm"
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
        readOnly={description === 'View'}
        autoComplete="off"
        onClick={() => {
          setShowSelections(!showSelections)
          formikSetFieldTouched('customer')}}
        error={
          formikTouched && formikError ? (
            <span className="text-danger small font-weight-bold">{formikError}</span>
          ) : null
        }
      />
      <Modal
        dialogClassName="receipt-customer-details-modal"
        show={show}
        onHide={() => setShow(false)}
      >
        <CustomerView match={{ params: { id: modalSelection.id } }} />
      </Modal>

      {showSelections && filteredSelections.length  ? (
        <ul className="customers-found" ref={dropRef}>
          {filteredSelections.map((selection, index) => {
            return (
              <li
                tabIndex="-1"
                className={
                  index === activeSelection ? 'customer-found-active' : 'customer-found'
                }
                key={index}
                onClick={handleClick(selection)}
              >
                {selection.firstName + ' ' + selection.lastName}
                <Button
                  variant="secondary"
                  className="float-right receipt-customer-details-btn py-0 px-2  "
                  onClick={handleModal(selection)}
                  text="Details"
                  size="sm"
                />
              </li>
            );
          })}
        </ul>
      ) : (
        showSelections &&
        inputValue && (
          <ul className="customers-found">
            <li className="text-danger">
              <strong>There is no customer found!</strong>
              <Button
                id="no-customer-found-btn"
                variant="danger"
                className="py-0 px-2 mx-3 float-right  "
                onClick={() =>
                  history.push({ pathname: '/manager/customers/add-customer' })
                }
                text="Add Customer"
                size="sm"
              />
            </li>
          </ul>
        )
      )}
    </div>
  );
};

export default Autocomplete;
