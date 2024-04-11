import nodemailer from 'nodemailer'
const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host:process.env.HOST,
            service: process.env.SMPT_SERVICE,
            port:process.env.SMPT_PORT,
           
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWARD,
            },
        });

        await transporter.sendMail({
            from:process.env.SMPT_MAIL ,
            to: options.email,
            subject: options.subject,
            text: options.message,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};


export{sendEmail};



















// const sendEmail=async(options)=>{
    
// const transporter=nodeMailer.createTransport({
//     service:process.env.SMPT_SERVICE,
//     auth:{
//         user:process.env.SMPT_MAIL,
//         pass:process.env.SMPT_PASSWARD,
//     }
// })
// const mailoptions={
//     from:process.env.SMPT_MAIL,
//     to:options.email,
//     subject:options.subject,
//     text:options.message,

// }
// await transporter.sendMail(mailoptions)
// }
