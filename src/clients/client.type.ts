import { ObjectId } from "mongodb";

export type client = {
    _id: ObjectId,
    client_name: string,
    client_type: ClientType,
    address: address,
    mobile_number: string,
    home_number?: string,
    income_tax_file: number,
    vat_file_number: number,
    email: string,
    password: string
    documents?: documents,
}

export type address = {
    city: string,
    street: string,
    number: number,
    zip_code?: number
}
export type documents = [
    {
        Document_name: string,
        Document_url: string,
        dateUplouded:Date
    }
]
export type ClientType = 'Companies' | 'Licensed dealer' | 'Exempt dealer' | 'Controlling employee' | 'Other' | 'General';