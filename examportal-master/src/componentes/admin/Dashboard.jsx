import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles, TablePagination } from '@material-ui/core';
import baseUrl from '../../config';
import dummyData from './data';
// ////////////////
// import { alpha } from '@material-ui/core/styles'
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
// //////////
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
//////////////////


const useStyles = makeStyles({
    root: {
        //   position:"",  
        minWidth: "94vW",
        //   overflow:"",
        margin: "10px",
        marginTop: "30px"
    },
    listIcon: {

        height: 30,
        width: 30
    },
    divider: {
        borderBottomStyle: "solid"
    }
});

const Dashboard = () => {
    const classes = useStyles();
    const [data1, setData] = useState(dummyData);

    useEffect(() => {

        getStudentData();

        // Run once when is loading or Reloading
    }, []);

    const getStudentData = async () => {


        const token = localStorage.getItem("adminToken");
        const reqOption = {
            method: 'GET',

            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            }

        }

        const res = await fetch(baseUrl+'/get_all_dashboard_data', reqOption)



        console.log(res);
        const resData = await res.json();

        console.log(resData)
        // if(res){
        //   let check =    document.querySelector("#column-toggle-8");
        //   console.log(check)
        // }

        setData(resData);




    }

    const columns = [


        {
            title: "Date", field: "timeStamp"
        },
        {
            title: "name", field: "studentName"
        },
        {
            title: "quizName", field: "quizName"
        },
        {
            title: "marks", field: "result"
        },
        {
            title: "attemptedQuestion", field: "attemptedQuestion"
        },
        {
            title: "correctAnswer", field: "correctAnswer"
        },
        {
            title: "totalQuestion", field: "totalQuestion"
        },

        {
            title: "username_ref", field: "username_ref"
        }




    ]

    return (
        <div className={classes.root}>
            <MaterialTable
                data={data1}
                icons={tableIcons}
                columns={columns}
                title="Result Data"
                onChangePage={(e) => { console.log(e) }}

                onChangeRowsPerPage={(e) => { console.log(e) }}

                options={{
                    // columnResizable: true,
                    filterType: "dropdown",
                    search: true,
                    grouping: true,
                    filtering: true,
                    exportButton: true,
                    // columnsButton:true,
                    loadingType: "overlay",
                    // exportAllData:true,
                    padding: "dense",
                    maxBodyHeight: "500px",
                    pageSizeOptions: [5, 10, 20, 30, 50, 75, 100, 200, 400],

                }
                }


            />
        </div>
    );
};

export default Dashboard;