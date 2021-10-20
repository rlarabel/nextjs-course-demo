import Head from 'next/head';
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {

    return (
        <Fragment>
            <Head>
            <title>{props.meetupData.title} | React Meetups</title>
            <meta 
                name='description'
                content={props.meetupData.description} 
            /> 
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
        
    );
};

export const getStaticPaths = async () => {
    const client = await MongoClient.connect('mongodb+srv://Rams:w0pq7y80YBHxyi2P@cluster0.tdko0.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    //find all meetups, first arg is a filter, second is the fields returned
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: { meetupId: meetup._id.toString() }
        }))
    }
};

export const getStaticProps = async (context) => {

    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://Rams:w0pq7y80YBHxyi2P@cluster0.tdko0.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    //find all meetups, first arg is a filter, second is the fields returned
    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId)
    });

    client.close();

    return ({
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description: selectedMeetup.description,
                image: selectedMeetup.image,
            }
        },
    })
};


export default MeetupDetails;