export class CreateClaimDto {
	firstName: string;
	mobilePhone: string;
	date: string;
	email: string | undefined;
	tag: string | undefined;
	location: string | undefined;

	constructor(props: {
		firstName: string;
		mobilePhone: string;
		date: string;
		email?: string;
		tag?: string;
		location?: string;
	}) {
		this.firstName = props.firstName;
		this.mobilePhone = props.mobilePhone;
		this.date = props.date;
		this.email = props.email;
		this.tag = props.tag;
		this.location = props.location;
	}
}
