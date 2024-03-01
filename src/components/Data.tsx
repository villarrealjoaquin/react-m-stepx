import { useStepx } from "../hooks/useStepx";

export default function Data() {
  const { getAllInfo } = useStepx();
  const { formData } = getAllInfo();
  console.log(getAllInfo().formData);


  return (
    <div>{Object.entries(formData).map(([key, value]) => <div key={key}>{key}: {value}</div>)}</div>
  )
}