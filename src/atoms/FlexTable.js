import React from 'react';
import './FlexTable.css';
import { Icon, Spinner } from './index';
import SubTable from './FlexTable';
import { formatDate } from './../helper/functions';

const FlexTable = ({
  subtable = false,
  titleData = [],
  subTitleData = [],
  data = [],
  iconClick,
  subTableIDs = [],
  subTableData = [],
  tableId,
  subtableId,
  tableType,
  pending = false,
  activePage = 1,
  pageSize = 20,
  handleSort = undefined
}) => {

  const handleClick = (fieldName) => {
    if (fieldName === 'icon') return
    if(handleSort) handleSort(fieldName)
  } 
  return (
    <div
      id={subtable ? `${subtableId}` : `${tableId}`}
      className={`flexTable flexTable--5cols flexTable--collapse ${
        subtable ? 'subFlexTable flexTable-row' : ''
      } `}
    >
      <div className="flexTable-row flexTable-row--head">
        <div className="flexTable-row flexTable-row--head">
        <div
              className={`flexTable-cell row-number-cell column-heading`}
            >
            </div>
          {titleData.map((item, k) => (
            <div
              key={k}
              className={`flexTable-cell ${item.fieldName}-cell column-heading`}
              onClick={() => handleClick(item.fieldName)}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      {pending && !data.length && (
        <div style={{ margin: '1rem auto' }}>
          <Spinner animation="grow" />
        </div>
      )}
      {data.map((item, i) => (
        <React.Fragment key={'row' + i}>
          <div
            className={`flexTable-row ${
              subTableIDs.includes(item.id) ? 'flexTable-row-active' : ''
            } ${item.deletedAt || item.status === 'DEPROVISIONED' ? 'flexTable-row-deleted' : ''}`}
          >
            <div className="flexTable-cell row-number-cell">{(i+1) + (activePage - 1) * pageSize}</div>
            {titleData.map((title, k) => {
              if (title.fieldName === 'createdAt' || title.fieldName === 'date') {
                return (
                  
                  <div
                    className={`flexTable-cell ${title.fieldName}-cell`}
                    key={'column' + k}
                  >
                    <div className="flexTable-cell--heading">{title.title}</div>
                    <div className={`flexTable-cell--content ${title.fieldName}-content`}>
                      {title.fieldName === 'createdAt' &&
                        formatDate(new Date(`${item.createdAt}`))}
                      {title.fieldName === 'date' && formatDate(new Date(`${item.date}`))}
                    </div>
                  </div>
                );
              }
              if (item[title.fieldName]) {
                return (
                  <div
                    className={`flexTable-cell ${title.fieldName}-cell`}
                    key={'column' + k}
                  >
                    <div className="flexTable-cell--heading">{title.title}</div>
                    <div className={`flexTable-cell--content ${title.fieldName}-content`}>
                      {item[title.fieldName]?.name || item[title.fieldName]}
                    </div>
                  </div>
                );
              }
              return (
                <div
                  className={`flexTable-cell ${title.fieldName}-cell`}
                  key={`icon${k + k}`}
                  name={item.id}
                >
                  <div className="flexTable-cell--heading">{title.title}</div>
                  <div className={`flexTable-cell--content ${title.fieldName}-content`}>
                    {title.icons?.map((icon, i) => {
                      if (
                        (item.deletedAt || item.status === 'DEPROVISIONED') &&
                        icon === 'TrashAlt'
                      ) {
                        return (
                          <Icon
                            key={i}
                            name={item.id}
                            icon={'fa' + icon}
                            onClick={() => 'e'}
                            id={icon}
                            size={'1x'}
                            fixedWidth
                            color="#cfd0d1"
                          />
                        );
                      }
                      return (
                        <Icon
                          key={i}
                          name={item.id}
                          icon={'fa' + icon}
                          onClick={iconClick}
                          id={icon}
                          size={'1x'}
                          fixedWidth
                          color="#333a40"
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {tableType === 'customer' && subTableIDs.indexOf(item.id) > -1 && (
            subTableData.filter((d) => d.customer.id === item.id).length > 0 ? (
              <SubTable
                subtable
                subtableId={subtableId}
                isOpen={true}
                data={subTableData.filter((d) => d.customer.id === item.id)}
                titleData={subTitleData}
                iconClick={iconClick}
              />
            ) : 
            (<p style={{marginTop: '10px'}}>This customer has no receipt!</p>)
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FlexTable;
