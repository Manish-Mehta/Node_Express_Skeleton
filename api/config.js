

module.exports = {
    
    'port': process.env.port || 8080,
    'database':'mongodb://127.0.0.1:27017/DbName',           // database connection link
    'superSecretCustomer':'Secret',                         // key for generating for customer api token
    'superSecretAdmin':'Secret' ,
    'GoogleApiKey':'Key',
    'transactionKey':'Key',
    'vendorKey':'Key'

}
