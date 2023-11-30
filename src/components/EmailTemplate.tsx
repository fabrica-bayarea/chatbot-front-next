type EmailTemplateProps = {
  firstName: string;
};

function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div>
      <h1>Welcome, {firstName}!</h1>
    </div>
  );
}

export default EmailTemplate;
