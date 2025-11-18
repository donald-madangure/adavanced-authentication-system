import { mailtrapClient, sender } from './mailtrap.config.js';
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from './emailTemplate.js';

export const sendVerificationEmail = async (email, verificationToken, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Verify Your Email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{name}', name).replace('{verificationCode}', verificationToken),
            category: 'Email Verification',
        });
        console.log('Verification email sent successfully:', response);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Error sending verification email:', error);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
    
    try {

       const response = await mailtrapClient.send({
            from: sender,
            to: recipient,  
            template_uuid: 'bf250a9c-165e-45fc-ad9c-5406d4d75605',
            template_variables: {
                 "company_info_name": "Madangure Advanced Authentication System",
                 "name": name                
            }
        });
        console.log('Welcome email sent successfully:', response);
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw new Error('Error sending welcome email:', error);
    }

}

export const sendPasswordResetEmail = async (email, name, resetURL) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,        
            subject: 'Reset Your Password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{name}', name).replace('{resetURL}', resetURL),
            category: 'Password Reset',
        });
        console.log('Password reset email sent successfully:', response);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Error sending password reset email:', error);
    }
}

export const sendResetSuccessEmail = async (email, name) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: 'Password Reset Successful',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace('{name}', name),
            category: 'Password Reset',
        });
        console.log('Password reset success email sent successfully:', response);
    } catch (error) {
        console.error('Error sending password reset success email:', error);
        throw new Error('Error sending password reset success email:', error);
    }
}
    