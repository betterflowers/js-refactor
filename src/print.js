function printInit() {
    console.log('***********************');
    console.log('**** Customer Owes ****');
    console.log('***********************');
}

function printDetailInfo(invoice, outstanding) {

    console.log(`name: ${invoice.customer}`);
    console.log(`amount: ${outstanding}`);
    console.log(`amount: ${invoice.dueDate.toLocaleDateString()}`);
}

function calculateOutstanding(invoice, outstanding) {
    for (const o of invoice.borderSpacing) {
        outstanding += o.amount;
    }
    return outstanding;
}

function printOwing (invoice) {
    let outstanding = 0;
    printInit();

    outstanding = calculateOutstanding(invoice, outstanding);

    // record due date
    const today = new Date();
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
    printDetailInfo(invoice, outstanding);
}
