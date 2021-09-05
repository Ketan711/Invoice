import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import MaterialTable from 'material-table';
import React, {useState} from 'react'
import {toWords} from 'number-to-words'
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: "15px",
    },
    root1:{
position:'relative',
right:-1050,
    },
    root2:{
        position:'relative',
        right:-950,
            },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        marginTop:-0.5,
    },
}));

function Invoice() {
    const classes = useStyles();
    const [fromState, setFromState] = useState('');
    const [toState, setToState] = useState('');
    const [tax, setTax] = useState(0);

    const handleChangeFrom = (event) => {
        setFromState(event.target.value);
    };
    const handleChangeTo = (event) => {
        setToState(event.target.value);
    };

    function getAmount(rate, qty){
        return rate*qty;
    }

    function getSubTotal(){
        return data.map(x => x.qty * x.rate).reduce((sum, i) => sum + i, 0)
    }

    function getTotal() {
        return getSubTotal() + ((getSubTotal() * tax) / 100)
    }

    const handleTaxChange = (event) => {
        setTax(event.target.value)
    }

    const [invoiceDate, setInvoiceDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [dueDate, setDueDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleInvoiceDateChange = (date) => {
        setInvoiceDate(date);
    };

    const handleDueDateChange = (date) => {
        setDueDate(date);
    };

    const [columns, setColumns] = useState([
        { title: 'Item Name', field: 'name' },
        { title: 'Quantity', field: 'qty', type: 'numeric' },
        { title: 'Rate', field: 'rate', type: 'numeric' },
        {
            title: 'Amount',
            render: rowData => getAmount(rowData.qty, rowData.rate)
        }
    ])

    const [data, setData] = useState([]);

    return (
        <div className={classes.root}>
              <div className={classes.root1}> <TextField
    id="outlined-secondary"
    label="Enter Invoice Number"
    variant="outlined"
     placeholder="#Invoice No."
  /></div>
  
  
            <Grid container direction="column" spacing={4}>
                <Grid direction="row" container item xs={12} spacing={2}>
                    <h2 style={{paddingTop: 11}}>From </h2>
                    
                    <Grid item>
                        <TextField label="Address Line 1" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <TextField label="Address Line 2" variant="outlined" />
                    </Grid>
                    <Grid item>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Select State</InputLabel>
                            <Select value={fromState} onChange={handleChangeFrom}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
                                <MenuItem value={"Gujrat"}>Gujrat</MenuItem>
                                <MenuItem value={"Delhi"}>Delhi</MenuItem>
                                <MenuItem value={"Punjab"}>Punjab</MenuItem>
                                <MenuItem value={"Maharastra"}>Maharastra</MenuItem>
                                <MenuItem value={"Madhya Pradesh"}>Madhya Pradesh</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid direction="row" container item xs={12} spacing={2}>
                    <h2 style={{paddingTop: 11}}>To &nbsp;&nbsp;</h2>
                    <Grid item>
                        <TextField label="Address Line 1" variant="outlined"/>
                    </Grid>
                    <Grid item>
                        <TextField label="Address Line 2" variant="outlined"/>
                    </Grid>
                    
                    <Grid item>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Select State</InputLabel>
                            <Select value={toState} onChange={handleChangeTo}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Rajasthan"}>Rajasthan</MenuItem>
                                <MenuItem value={"Gujrat"}>Gujrat</MenuItem>
                                <MenuItem value={"Delhi"}>Delhi</MenuItem>
                                <MenuItem value={"Punjab"}>Punjab</MenuItem>
                                <MenuItem value={"Maharastra"}>Maharastra</MenuItem>
                                <MenuItem value={"Madhya Pradesh"}>Madhya Pradesh</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <br></br><br></br>
            {/* date picker table */}
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Invoice Data</TableCell>
                            <TableCell>Due Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        label="Date Picker"
                                        format="MM/dd/yyyy"
                                        value={invoiceDate}
                                        onChange={handleInvoiceDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </TableCell>
                            <TableCell>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        label="Date Picker"
                                        format="MM/dd/yyyy"
                                        value={dueDate}
                                        onChange={handleDueDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <br></br><br></br>
            {/* item table */}
            <div>
                <MaterialTable
                    title="Items"
                    columns={columns}
                    data={data}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                setData([...data, newData]);
                                resolve()
                            }, 1000)
                        }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);
                                resolve();
                            }, 1000)
                        }),
                    }}
                />
            </div>
        
            <br></br><br></br>
            <div className={classes.root2}> 
            <h5>Sub Total: {getSubTotal()}</h5>
            <br></br>
           <TextField value={tax} onChange={handleTaxChange} label="Tax (in %)"/>
            <h5>Total: {getTotal()}</h5>
            <br></br>
            <h5>Total in words: Rupees {toWords(getTotal())} </h5>
           
            </div>
        </div>
    )
}

export default Invoice
