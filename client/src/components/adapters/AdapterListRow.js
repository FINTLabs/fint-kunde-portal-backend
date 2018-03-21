import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import CatPage from './CatPage';

const AdapterListRow = ({adapter}) => {
  return (
    <tr>
      <td><Link to={'/adapters/' + adapter.id}>{adapter.name}</Link></td>
    </tr>
  );
};

AdapterListRow.propTypes = {
  adaper: PropTypes.object.isRequired
};

export default AdapterListRow;
