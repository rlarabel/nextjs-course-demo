import Head from 'next/head';
import { useRouter } from "next/router";
import { Fragment } from "react";

import NewMeetupForm from "../../components/meetups/NewMeetupForm";



const NewMeetupPage = () =>  {
    const router = useRouter();
    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);

        router.replace('/');
    };

    return (
        <Fragment>
            <Head>
            <title>Add A New Meetup | React Meetups</title>
            <meta 
                name='description'
                content='Create your own Meetup and find great network opportunities.' 
            /> 
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>
        </Fragment>
        
    );
}

export default NewMeetupPage;