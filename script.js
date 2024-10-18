function register(){
    //get input from user in input fields
    let username=document.getElementById("reg-uname").value
    let password=document.getElementById("reg-pswd").value
    let email=document.getElementById("reg-email").value

    //object for taking in new user details
    const userobject={
        Name: username,
        Email: email,
        Password: password,
        
    };
    //check if user already exist in local storage or not
    if(userobject.Email in localStorage || userobject.Password in localStorage){
        alert("Account already exist")
    }//check for empty fields
    else if(userobject.Name == '' || userobject.Email == '' || userobject.Password == ''){
        alert("Empty fields not allowed")
    }else{
        
        
        //take in details of new as key value pairs taking Accountno as the unique key
        window.localStorage.setItem(userobject.Email,JSON.stringify(userobject))
        alert("Registration Successful")
        window.location="./login.html"
       
    }
}

function login(){
    //actual login
    let mail=document.getElementById("login_email").value
    let psw=document.getElementById("login_pswd").value
    

    if(mail in localStorage){//checked if the unique key Accountno is already present in local storage
        
        let userobject=JSON.parse(localStorage.getItem(mail))//since acn is already there in local storage and is given as unique key
         if(psw===userobject.Password){
             

            alert("Login successful")
            window.location="./mainpage.html"
          
          
            
            
         }else if(psw === ""){
            alert("Empty fields not allowed")
         }
         else{
            alert("Incorrect Password")
         }
        

    }else if(mail === ""){
        alert("Empty fields not allowed")
    }else{
        alert("User not regsitered or invalid account number")
    }
}



let totalBalance = 0;
let totalExpense = 0;
//display balance and expense on top
function updateDisplay() {
    balanceDisplay=document.getElementById('totalBalance')
    balanceDisplay.textContent = `₹ ${totalBalance}`;
    expenseDisplay=document.getElementById('totalExpense')
    expenseDisplay.textContent = `₹ ${totalExpense}`;
}
//add income
function addIncome() {
    let incomeType = document.getElementById('incomeType').value;
    let incomeAmount = parseFloat(document.getElementById('incomeAmount').value);

    if (incomeType && !isNaN(incomeAmount) && incomeAmount > 0) {
        totalBalance += incomeAmount;
        updateDisplay();
        addRow('incomeTable', 'incomeBody', incomeType, incomeAmount);
        document.getElementById('incomeType').value = '';
        document.getElementById('incomeAmount').value = '';
    } else {
        alert("Please enter a valid income type and amount.");
    }
}

function addExpense() {
    let expenseType = document.getElementById('expenseType').value;
    let expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

    if (expenseType && !isNaN(expenseAmount) && expenseAmount > 0) {
        totalExpense += expenseAmount;
        totalBalance -= expenseAmount;
        updateDisplay();
        addRow('expenseTable', 'expenseBody', expenseType, expenseAmount);
        document.getElementById('expenseType').value = '';
        document.getElementById('expenseAmount').value = '';
    } else {
        alert("Please enter a valid expense type and amount.");
    }
}

function addRow(tableId, bodyId, type, amount) {
    let tableBody = document.getElementById(bodyId);
    let row = tableBody.insertRow();
    let typeCell = row.insertCell(0);
    let amountCell = row.insertCell(1);
    let balanceCell = row.insertCell(2);
    let dateCell = row.insertCell(3);

    typeCell.textContent = type;
    amountCell.textContent = `₹ ${amount}`;
    balanceCell.textContent = `₹ ${totalBalance}`;
    dateCell.textContent = new Date().toLocaleString();
}

function clearData() {
    if (confirm("Are you sure you want to clear all data?")) {
        totalBalance=0;
        totalExpense=0;
        incomeType.value=''
        incomeAmount.value=''
        expenseType.value=''
        expenseAmount.value=''
        balanceDisplay.innerHTML='&#8377;0'
        expenseDisplay.innerHTML='&#8377;0'
        
        document.getElementById('incomeBody').innerHTML = '';
        document.getElementById('expenseBody').innerHTML = '';
    }
}
//pie chart
function pieChart() {
    const ctx = document.getElementById('budgetChart').getContext('2d');

    const data = {
        labels: ['Expense', 'Remaining Balance'],
        datasets: [{
            label: 'My First Dataset',
            data: [totalExpense, totalBalance],
            backgroundColor: ['#FF6384', 'darkblue'],
            hoverOffset: 4
        }]
    };

    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true
        }
    });
}
//logout
function logout(){
    window.localStorage.clear();
    window.location="login.html"
}