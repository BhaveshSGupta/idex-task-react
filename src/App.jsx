import { useState } from "react";
import "./App.css";

function App() {
  const [jsondata, setJsondata] = useState([]);
  const formTree = (flatdata) => {
    let tree = [];
    const hashmap = {};
    flatdata.forEach((employee) => {
      hashmap[employee.empId] = employee;
      hashmap[employee.empId].children = [];
    });
    for (const empid in hashmap) {
      const employee = hashmap[empid];
      if (employee.mgrdId) {
        hashmap[employee.mgrdId].children.push(employee);
      } else {
        tree.push(employee);
      }
    }
    return tree;
  };
  const DrawHierarcy = ({ employee, ...props } = props) => {
    if (employee.children.length > 0) {
      return (
        <div>
          <span>{employee.empName}</span>
          {employee?.children?.map((subemployee) => (
            <DrawHierarcy key={subemployee.empId} employee={subemployee} />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <span>{employee.empName}</span>
        </div>
      );
    }
  };
  const drawTree = (treedata) => {
    return treedata.map((employee) => <DrawHierarcy key={employee.empId} employee={employee} />);
  };
  return (
    <div className="App">
      <textarea
        name="jsonpaste"
        id="jsonpaste"
        cols={100}
        rows="10"
        onChange={(elem) => {
          setJsondata(JSON.parse(elem.target.value));
        }}
      ></textarea>
      {jsondata.length > 0 && (
        <section id="buildarea">{drawTree(formTree(jsondata))}</section>
      )}
    </div>
  );
}

export default App;
