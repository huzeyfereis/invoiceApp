import React from 'react';
import { FlexTable, Button } from '../../../atoms';

const RefBody = ({data, title, handleClick, pending, refName, name}) => {
  return (
    <div className="col-12" style={{ margin: '10px auto' }}>
      <div>
      <div className="reference-list-bar d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4>{refName}</h4>
        </div>
            <Button
            text={`Add ${refName}`}
            variant="info"
            onClick={(e) => handleClick(e, 'Add', null, name, refName)}
            className="ml-auto"
            id={'list-add-user-button'}
          />
        </div>
      </div>     
      <FlexTable
        tableType="manager"
        data={data}
        titleData={title}
        iconClick={(e, icon, id) => handleClick(e, icon, id, name, refName)}
        tableId={'manager-list-flex-table'}
        pending={pending}
      />
    </div>
  );
};

export default RefBody;
