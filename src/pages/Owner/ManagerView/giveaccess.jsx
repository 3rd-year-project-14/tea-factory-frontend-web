import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Button from '../../../components/ui/Button';

export default function GiveAccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.manager || {};
  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = () => {
    const templateParams = {
      to_name: formData?.name,
      to_email: formData?.email,
      role: formData?.role,
      factory: formData?.factory,
      password: formData?.password,
    };

    emailjs.send(
      'service_pureleaf',
      'template_unor4tz',
      templateParams,
      'CErGd8kS6Lk5ik7fg'
    )
    .then((response) => {
      console.log('Email sent successfully!', response.status, response.text);
      setEmailSent(true);
    })
    .catch((error) => {
      console.error('Email sending failed:', error);
      alert('Failed to send email. Please try again.');
    });
  };

  const handleAddNew = () => {
    navigate('/owner/managers');
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-card dark:bg-card-dark rounded-2xl shadow-card max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center p-6 border-b border-tea-100 dark:border-card-border-dark">
          <h2 className="text-xl font-heading font-semibold text-ink dark:text-ink-dark">Manager Created</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="text-ink/80 dark:text-ink-dark/80 text-base mb-2">
            The manager account has been created successfully.<br />
            Please review the details below and assign system access and permissions.<br />
            {emailSent ? (
              <span className="text-green-600 dark:text-green-400 font-medium">A welcome email has been sent to the manager.</span>
            ) : (
              <span className="text-ink/50 dark:text-muted-dark">You can also send a welcome email with login instructions.</span>
            )}
          </div>
          <div className="bg-surface dark:bg-white/5 rounded-lg p-4 border border-tea-100 dark:border-card-border-dark space-y-1">
            <div className="font-semibold text-ink dark:text-ink-dark mb-2">Manager Details</div>
            <div className="text-sm text-ink/80 dark:text-ink-dark/80"><b>Name:</b> {formData?.name}</div>
            <div className="text-sm text-ink/80 dark:text-ink-dark/80"><b>NIC:</b> {formData?.nic}</div>
            <div className="text-sm text-ink/80 dark:text-ink-dark/80"><b>Mobile:</b> {formData?.mobile}</div>
            <div className="text-sm text-ink/80 dark:text-ink-dark/80"><b>Email:</b> {formData?.email}</div>
            <div className="text-sm text-ink/80 dark:text-ink-dark/80"><b>Password:</b> {formData?.password}</div>
            <div className="text-sm text-ink/80 dark:text-ink-dark/80"><b>Role:</b> {formData?.role}</div>
            <div className="text-sm text-ink/80 dark:text-ink-dark/80"><b>Factory:</b> {formData?.factory}</div>
          </div>
          <div className="space-y-4">
            <Button
              variant="primary"
              className="w-full justify-center"
              onClick={handleSendEmail}
              disabled={emailSent}
            >
              {emailSent ? 'Email Sent' : 'Send Welcome Email'}
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-center !bg-tea-100 dark:!bg-tea-900/30 !text-tea-800 dark:!text-tea-200 hover:!bg-tea-200"
              onClick={handleAddNew}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
