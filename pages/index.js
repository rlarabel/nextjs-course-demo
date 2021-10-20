import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';

const HomePage = (props) => {
    return (
        <Fragment>
            <Head> 
                <title>React Meetups</title>
                <meta 
                    name='description'
                    content='Browse a huge list of highly active React meetups!' 
                /> 
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
};

//Can use getServerSideProps to pre generate the correct data for every request
//This is only on the server side code & helps pre render api data on a timed interval
// Can securly connect to a db
export const getStaticProps = async () => {
    const client = await MongoClient.connect('mongodb+srv://Rams:w0pq7y80YBHxyi2P@cluster0.tdko0.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return ({
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),

            }))
        },
        revalidate: 10
    });
}

export default HomePage;