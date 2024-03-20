export default function Formx({
  children,
  submit,
  ...props
}: {
  children: React.ReactNode;
  submit: () => void;
}) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        {...props}
      >
        {children}
      </form>
    </>
  );
}
