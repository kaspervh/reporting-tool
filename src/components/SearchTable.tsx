import React, {useState} from 'react';
import InvoiceHeader from '../stubs/mockData';
import Paper from '@material-ui/core/Paper';
import {FilteringState, IntegratedFiltering, SelectionState, PagingState,} from '@devexpress/dx-react-grid';
import {Grid, DragDropProvider, Table, TableHeaderRow, TableColumnResizing, ColumnChooser, TableColumnVisibility, Toolbar, TableFilterRow, TableColumnReordering, TableSelection,} from '@devexpress/dx-react-grid-material-ui';
import { LinearProgress } from '@material-ui/core';

const SearchTable = () => {
  const documentLines:any = InvoiceHeader

  console.log(documentLines.lines)

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [defaultColumnWidths, setDefaultColumnWidths] = useState([]);
  const [defaultTableOrder, setDefaultTableOrder] = useState([])
  const [defaultHiddenColumnNames, setDefaultHiddenColumnNames] = useState([]);
  const [selection, setSelection] = useState([0]);

  const setTableData = (element:string) => {
    if(element === "defaultTableOrder"){
      let order:any = Object.keys(documentLines[0]);
      let localOrder:any = localStorage.getItem('defaultTableOrder');
      if(localOrder != null){
        localOrder = JSON.parse(localOrder);
        if(localOrder !== defaultTableOrder as any ){
          order = localOrder;
        }
      }
      setDefaultTableOrder(order)
      return defaultTableOrder
    }

    if(element === "defaultColumnWidhs"){
      let cols:any = [];
      const names:String[] = Object.keys(documentLines[0]);
      for(let element of names){cols.push({ columnName: element, width: 100 })}
      let columnWidths:any = localStorage.getItem('defaultColumnWidths');
      if(columnWidths != null){
        columnWidths = JSON.parse(columnWidths)
        if(columnWidths !== defaultColumnWidths as any){
          cols = columnWidths
        }
        
      }
      setDefaultColumnWidths(cols);
      return defaultColumnWidths;
    }

    if(element === 'rows'){
      setRows(documentLines);
      return documentLines; 
    }

    if(element === 'columns'){
      let cols:any = [];
      console.log(Object.keys(documentLines[0]))
      const names:String[] = Object.keys(documentLines[0]);
      
      for(let element of names){cols.push({name: element, title: element.toLocaleUpperCase()})}
      setColumns(cols);
      return columns;
    }

    if(element === 'defaultHiddenColumnNames'){
      let columnNames:any = localStorage.getItem('defaultColumnNames');
      if(columnNames != null ){
        columnNames = JSON.parse(columnNames);
        if(defaultHiddenColumnNames.length === 0 && columnNames.length !== 0 ){
          console.log('here')
          setDefaultHiddenColumnNames(columnNames);
        }
      }
      return defaultHiddenColumnNames
    }
  }
  
  const handleRowSelection = (sel:any) => {
    for(let num of sel){
      if(num !== selection[0]){
        setSelection([num])
      }
    }
  }

  const saveTableOrder = (tableOrder:any) => {
    localStorage.setItem('defaultTableOrder', JSON.stringify(defaultTableOrder));
    setDefaultTableOrder(tableOrder);
  }

  const saveHiddenColumns = (columnNames:any) => {
    localStorage.setItem('defaultColumnNames', JSON.stringify(columnNames));
    setDefaultHiddenColumnNames(columnNames);
  }

  const saveColumnWidths = (columnWidth:any) => {
    localStorage.setItem('defaultColumnWidths', JSON.stringify(columnWidth));
    setDefaultColumnWidths(columnWidth);
  }


  return(
    <div className="table-container">
      
      <Paper>
        <Grid rows={rows.length === 0 ? setTableData("rows") : rows } columns={columns.length === 0 ? setTableData("columns") : columns}>
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />
          <DragDropProvider />
          
          <PagingState defaultCurrentPage={0} pageSize={5} />
          <SelectionState selection={selection} onSelectionChange={(sel:any) => handleRowSelection(sel)} />
          <Table />
          <TableColumnReordering defaultOrder={defaultTableOrder.length ===0 ? setTableData("defaultTableOrder") : defaultTableOrder} onOrderChange={(tableOrder:any) => saveTableOrder(tableOrder)}/>
          <TableColumnVisibility defaultHiddenColumnNames={setTableData('defaultHiddenColumnNames')} onHiddenColumnNamesChange={(columnNames:any) => saveHiddenColumns(columnNames)}/>
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths.length === 0 ? setTableData("defaultColumnWidhs") : defaultColumnWidths} onColumnWidthsChange={(widths:any) => saveColumnWidths(widths)}/>
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