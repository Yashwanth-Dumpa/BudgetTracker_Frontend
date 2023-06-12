import HelpIcon from '@mui/icons-material/Help';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';


const Help = ()=>{

    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
    return(
    
        <div>
            <button data-toggle="tooltip"
          data-placement="top"
          title="Help" className='btn-transparent btn bg-white' ><HelpIcon fontSize='large'  onClick={handleClick}/></button>
        
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}

        >
          <div className='d-flex flex-column p-3 scrollspy-example text-light bg-dark' data-bs-spy="scroll" data-bs-offset="0" tabindex="0">
            <h2 className='text-center'>Help</h2>
            <h4 className='text-center'>
               <strong> Welcome to Budget Tracker Application.</strong>
            </h4>
            <br/>
            <p>
            The Budget Tracker application empowers you to make informed financial decisions
          by providing real-time insights into your expenses, ensuring they stay
          within their budget and manage your finances effectively.
            </p>
    
            <p>
                If you are a<span className='text-white'> <em><strong>New User</strong></em></span>, please navigate to the <span className='text-warning'><em>Budget tab</em></span> and enter your
                <span className='text-info'> Income</span> and <span className='text-info'>Limit</span> for atleast one month to add expense of any kind
                for that particular month and click on <span className='text-primary'>Save</span>  on the top right.
                By clicking on the arrow down button in the table you can view your <em>Transaction</em> history for that respective month.
                You can add expenses by clicking on <span className='text-primary'>Enter Expense</span> on the top left in Budget tab.
                To view the stats of you expenses or to modify any transactions please go the <span className='text-warning'><em>Expenses tab</em></span>.
            </p>
            
            <p>
                All your expenses can be seen in <span className='text-warning'><em>Expenses tab</em></span>. Here you can select any date range and by clicking on <span className='text-primary'>Show Expenses </span> 
                all your transactions in the given date range will be displayed in the below table. You can <em>Edit, Delete</em> any of the transactions.
                <strong> View Spends</strong> chart will show your expenses in the given date range and by default it will show you all of the expenses you have made 
                till now. The <strong>View Balance</strong> chart shows only two slices. One slice will show you the remaining Balance in your account and another slice will
                show you the expenses you have made until now. It will show the data for the whole year.

            </p>
          </div>
        </Popover>
      </div>
    )

}

export default Help;


