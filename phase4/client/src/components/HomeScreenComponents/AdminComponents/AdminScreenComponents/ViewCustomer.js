import React, {useState, useEffect} from 'react';
import * as api from '../../../../api';

const ViewCustomer = (props) => {

  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [table, setTable] = useState();

  const handleFilter = () => {
    firstName = !firstName ? 'NULL' : `'${firstName}'`;
    lastName = !lastName ? 'NULL' : `'${lastName}'`;
    api.getCustomers({
      firstname: firstName,
      lastname: lastName
    })
        .then((results) => {
          console.log(results);
          setTable(results.data.result);
        }).catch((error) => {
      // setError(true);
      console.log(error);
      console.log("Failed to get customers");
    });
  }

  const handleReset = () => {
    firstName = null;
    lastName = null;
    document.getElementById("firstNameInput").value = '';
    document.getElementById("lastNameInput").value = '';
    console.log(`New name is: ${firstName} ${lastName}`);
    handleFilter();
  }

  useEffect(() => {
    handleFilter();
  }, [])

  useEffect(() => {
    console.log(table);
  }, [table])

  return (
    <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%'
        }}>
      
      <div><br/><br/>
        <h1>View Customers</h1>
    
        <div style={{
          display: 'flex', flexDirection: 'row'
        }}>
          <h3>Customer: </h3>
          <input id="firstNameInput" className="inputs" placeholder={'First Name'} onChange={(e) => {setFirstName(e.target.value)}}>
          </input>
          <input id="lastNameInput" className="inputs" placeholder={'Last Name'} onChange={(e) => {setLastName(e.target.value)}}>
          </input>
        </div>
        <br />
        <ViewInfo propsTable={table} />
        <br />
        <div style={{
          display: 'flex', justifyContent: 'center', flexDirection: 'row'
        }}>
            <button className="buttons" onClick={() => {props.history.goBack()}}>Back</button>
            <button className="buttons" onClick={() => {handleReset()}}>Reset</button>
            <button className="buttons" onClick={() => {handleFilter()}}>Filter</button>
        </div>
        <br/>
      </div>
    </div>
  )
}


const ViewInfo = ({propsTable}) => {

  let [table, setTable] = useState();
  let [sortUsername, setSortUsername] = useState(true);
  let [sortFullName, setSortFullName] = useState(true);
  let [sortAddress, setSortAddress] = useState(true);

  const handleSort = (e, key) => {
    let bool;
    let sortedTable = table;
    switch (key) {
      case 'Username':
        bool = sortUsername;
        setSortUsername(!sortUsername);
        break;
      case 'FullName':
        bool = sortFullName;
        setSortFullName(!sortFullName);
        break;
      default:
        bool = sortAddress;
        setSortAddress(!sortAddress);
        break;
    }
    if (bool) {
      sortedTable.sort((a, b) => a[key].localeCompare(b[key]));
    } else {
      sortedTable.sort((b, a) => a[key].localeCompare(b[key])); 
    }
    console.log(sortedTable);
    setTable(sortedTable);
  }

  useEffect(() => {
    console.log(table);
  }, [table])

  useEffect(() => {
    setTable(propsTable);
  }, [propsTable]);

  return(
    <div className="table-wrapper-scroll-y my-custom-scrollbar" >
      {!table ? <div></div> :
      <table className="table table-bordered table-striped mb-0">
      <thead>
          <tr>
          <th onClick={(e) => {handleSort(e, 'Username')}} scope="col">Username</th>
          <th onClick={(e) => {handleSort(e, 'FullName')}} scope="col">Full Name</th>
          <th onClick={(e) => {handleSort(e, 'Address')}} scope="col">Address</th>
          </tr>
      </thead>
      <tbody>
        {
          table.map((element) => {
            return <tr key={element.Username}>
              <td>{element.Username}</td>
              <td>{element.FullName}</td>
              <td>{element.Address}</td>
            </tr>
          })
        }
      </tbody>
      </table>
      }

    </div>
  )
}

export default ViewCustomer
