interface ITemplateVariables {
  [key: string]: string | number; // Array de objetos com qualquer key desde que seja string ou número
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables:ITemplateVariables,
}
