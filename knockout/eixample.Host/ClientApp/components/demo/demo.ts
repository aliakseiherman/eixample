import * as ko from 'knockout';
import 'isomorphic-fetch';

interface Person {
    id: number;
    name: string;
    description: string;
}

class DemoViewModel {

    public isNew: KnockoutComputed<boolean>;

    public person = ko.observable<Person>({ id: 0 } as Person);
    public people = ko.observableArray<Person>();

    public initEditPersonState: (person: Person) => void;
    public initAddPersonState: () => void;

    public loadPeople: () => void;

    public addPerson: () => void;
    public updatePerson: () => void;
    public deletePerson: (person: Person) => void;

    constructor() {

        let self = this;

        this.isNew = ko.computed({
            owner: this,
            read: () => {
                return self.person().id < 1;
            }
        });

        this.initEditPersonState = (person: Person) => {
            this.person(person);
        }

        this.initAddPersonState = () => {
            this.person({ id: 0 } as Person);
        }

        this.loadPeople = () => {
            fetch('api/Person/GetAll')
                .then(response => response.json() as Promise<Person[]>)
                .then(data => { this.people(data); });
        }

        this.addPerson = () => {
            fetch('api/Person/Add', {
                method: 'POST',
                body: JSON.stringify(self.person()),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => { self.loadPeople(); });
        }

        this.updatePerson = () => {
            fetch('api/Person/Update', {
                method: 'POST',
                body: JSON.stringify(self.person()),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => { self.loadPeople(); });
        }

        this.deletePerson = (person: Person) => {
            fetch('api/Person/Delete', {
                method: 'POST',
                body: JSON.stringify(person),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => { self.loadPeople(); });
        }

        self.loadPeople();
    }
}

export default { viewModel: DemoViewModel, template: require('./demo.html') };