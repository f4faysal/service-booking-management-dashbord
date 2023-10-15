import { useCategoriesQuery } from "@/redux/api/categorieApi";
import FormSelectField from "./formSelectField";

type ServiceCategoreProps = {
  name: string;
  label: string;
};

const ServiceCategoreField = ({ name, label }: ServiceCategoreProps) => {
  const { data, isLoading } = useCategoriesQuery({});

  const categories = data?.data;
  //@ts-ignore
  const categoriesOptions = categories?.map((categorie) => {
    return {
      label: categorie?.title,
      value: categorie?.id,
    };
  });

  return (
    <FormSelectField name={name} label={label} options={categoriesOptions} />
  );
};

export default ServiceCategoreField;
