const Admin = require('./models/Admin');
const bcrypt=require('bcrypt')

async function createAdmin() {
    try {

        let adminExits = await Admin.findOne({ email: 'arisha@yopmail.com'})
        if (adminExits) {
            console.log("Admin Updated...")
        } else {

            let admin = new Admin();
    
            admin.firstName = 'Arisha';
            admin.lastName = 'Ali';
            admin.email = 'arisha@yopmail.com';
            let encryptedPassword = bcrypt.hashSync("arisha@123", 10);
            admin.password = encryptedPassword;
            
    
            await admin.save();
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = createAdmin;