import { describe, it } from "node:test";
import { ref as dbRef, onValue } from 'firebase/database';
import { rtDB } from '../app/firebaseconfig';

const chai = require('chai');
const expect = chai.expect;
const userName = 


describe('/String validation', function() {
    it('should test two Strings', function() {
        let expectedValue = "johnson4500";
        let actualValue = userName;
        
        expect(actualValue).to.be.equal(expectedValue)
    })
})

describe('/Test database functionality', function() {
    it('should test two objects', function() {
        interface Photo {
            imgURLs: {
                [key: string]: string;
            };
            lat: number;
            long: number;
            photoDescription: string;
            photoID: string;
        };

        const databaseRef = dbRef(rtDB, 'photos/1');
        const actualData: Photo[] = [];
        onValue(databaseRef, (snapshot) => {
                snapshot.forEach(childSnapShot => {
                actualData.push(childSnapShot.val());
            })
        });

        const expectedData = {
            imgURLs: "https://i.ytimg.com/vi/1wzpjPjS9DI/maxresdefault.jpg",
            lat: 43.741254,
            long: -79.483301,
            photoDescription: "awesome park",
            photoID: "1"
        };

        expect(actualData).to.be.equal(expectedData)
    })
});