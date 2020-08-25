import React, {useState, useEffect} from 'react';
import Documents from '../stubs/mockData';
import Paper from '@material-ui/core/Paper';
import {FilteringState, IntegratedFiltering, SelectionState} from '@devexpress/dx-react-grid';
import {Grid, DragDropProvider, Table, TableHeaderRow, TableColumnResizing, ColumnChooser, TableColumnVisibility, Toolbar, TableFilterRow, TableColumnReordering, TableSelection} from '@devexpress/dx-react-grid-material-ui';

const SearchTable = () => {
  const documentLines:any = Documents.lines

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [defaultColumnWidths, setDefaultColumnWidths] = useState([]);
  const [defaultTableOrder, setDefaultTableOrder] = useState([])
  const [defaultHiddenColumnNames, setDefaultHiddenColumnNames] = useState([]);
  const [selection, setSelection] = useState([0]);

  useEffect(() => {

    // if columnsis empty, code will get the data from "db"
    if(columns.length === 0){
      let cols:any = []
      const names:String[] = Object.keys(documentLines[0]);
      for(let element of names){cols.push({name: element, title: element.toLocaleUpperCase()})}
      setColumns(cols);
    }
    // sets the table rows based on "db" data
    if(rows.length === 0){setRows(documentLines) }

    
    console.log(defaultColumnWidths)
  },[columns, rows, defaultColumnWidths, defaultTableOrder, defaultHiddenColumnNames])

  const setTableData = (element:string) => {
    if(element === "defaultTableOrder"){
      const order:any = Object.keys(documentLines[0])
      setDefaultTableOrder(order)
      return defaultTableOrder
    }

    if(element === "defaultColumnWidhs"){
      let cols:any = [];
      const names:String[] = Object.keys(documentLines[0]);
      for(let element of names){cols.push({ columnName: element, width: 100 })}
      setDefaultColumnWidths(cols);
      return defaultColumnWidths;
    }

    if(element === 'rows'){
      setRows(documentLines);
      return documentLines; 
    }

    if(element === 'columns'){
      let cols:any = []
      const names:String[] = Object.keys(documentLines[0]);
      for(let element of names){cols.push({name: element, title: element.toLocaleUpperCase()})}
      setColumns(cols);
      return columns;
    }


  }
  
  const handleRowSelection = (sel:any) => {
    for(let num of sel){
      if(num !== selection[0]){
        setSelection([num])
      }
    }
  }

  const setTableOrder = () => {
    if(defaultTableOrder.length === 0){
      const order:any = Object.keys(documentLines[0])
      setDefaultTableOrder(order)
      return defaultTableOrder
    }
  }
  
  
  return(
    <div className="table-container">
      <Paper>
        <Grid rows={rows.length === 0 ? setTableData("rows") : rows } columns={columns.length === 0 ? setTableData("columns") : columns}>
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />
          <DragDropProvider />
          <SelectionState selection={selection} onSelectionChange={(sel:any) => handleRowSelection(sel)} />
          <Table />
          <TableColumnReordering defaultOrder={defaultTableOrder.length ===0 ? setTableData("defaultTableOrder") : defaultTableOrder} onOrderChange={(tableOrder:any) => setDefaultTableOrder(tableOrder)}/>
          <TableColumnVisibility defaultHiddenColumnNames={defaultHiddenColumnNames} onHiddenColumnNamesChange={(columnNames:any) => setDefaultHiddenColumnNames(columnNames)}/>
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths.length === 0 ? setTableData("defaultColumnWidhs") : defaultColumnWidths} onColumnWidthsChange={(widths:any) => setDefaultColumnWidths(widths)}/>
          <TableSelection selectByRowClick highlightRow showSelectionColumn={false} />
          <Toolbar />
          <ColumnChooser />
          <TableHeaderRow />
          <TableFilterRow />
          
        </Grid>
      </Paper>
    </div>
  )
}

export default SearchTable;