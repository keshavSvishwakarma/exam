import React from 'react';
import { auto } from '@popperjs/core';
import { makeStyles, Table, TableBody, TableContainer, TableRow, TableCell, Card, Avatar, Paper } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';









const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[500],
    marginLeft: auto,
    marginRight: auto,
    marginTop: 20,
    height: 100,
    width: 100,
    //   boxShadow:,
  }, table: {
    marginTop: 50,
    minWidth: 800,
    paddingBottom: 50,
    paddingLeft: 100,
    paddingRight: 100,
    // marginRight:150,

  }, cell: {
    border: 1,
    borderStyle: 'solid',

    //   borderBlockColor:"black",

  }
  , row: {
    border: 1,
    borderStyle: 'solid',
    borderCollapse: true
    //   borderBlockColor:"black",

  }
}));
const Profile = () => {
  const classes = useStyles();
  // const [expanded, setExpanded] = React.useState(false);



  const USER = JSON.parse(localStorage.getItem("USER"));


  return (
    <div className=' mt-5'>
      <Card className={classes.root} variant={'outlined'}>



        <Avatar className={classes.avatar}>

        </Avatar>

        {/* </CardHeader> */}

        <TableContainer className={classes.table} component={Paper}>
          <Table aria-label="simple table">

            <TableBody className={"border-2 "}>


              <TableRow   >
                <TableCell className="border-1" component="th" scope="row">NAME</TableCell>
                <TableCell className="border-1" component="th" align="left">{USER.activeFirstName + " " + USER.activeLastName}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="border-1" component="th" scope="row">PHONE</TableCell>
                <TableCell className="border-1" component="th" align="left">{USER.phone}</TableCell>
              </TableRow>
              <TableRow >
                <TableCell className="border-1" component="th" scope="row">ROLE</TableCell>
                <TableCell className="border-1" component="th" align="left">{USER.role}</TableCell>
              </TableRow>
              <TableRow >

                <TableCell className="border-1" component="th" scope="row">STATUS</TableCell>
                <TableCell className="border-1" component="th" align="left">{USER.status ? "Active" : "Deactive"}</TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>



      </Card>
     </div>
  );
};

export default Profile;