import React, {PropTypes} from 'react';
import AdapterListRow from './AdapterListRow';

const AdapterList = ({adapters}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {adapters.map(adapter => 
          <AdapterListRow key={adapter.id} adapter={adapter} />
        )}
      </tbody>
    </table>
  );
};

CatList.propTypes = {
  cats: PropTypes.array.isRequired
};

export default AdapterList;