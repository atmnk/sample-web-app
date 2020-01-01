// ./**tests**/todo_component_test.js
import * as React from 'react';
import { shallow } from 'enzyme';
import {BlogEntry} from "../../components/BlogEntry";
import {JD} from "../../components/JD";

function shallowSetupNullDetails(username:string) {

    const props = {
        username:username,
        details:null
    }
    // wrapper instance around rendered output
    const enzymeWrapper = shallow(<JD {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

function shallowSetup({username="atmaram",name="Atmaram",company="TW",designation="Sr Con"}={username:"atmaram",name:"Atmaram",company:"TW",designation:"Sr Con"}) {

    const props = {
        username:username,
        details:{
            name:name,
            company:company,
            designation:designation
        }
    }
    // wrapper instance around rendered output
    const enzymeWrapper = shallow(<JD {...props} />);

    return {
        props,
        enzymeWrapper
    };
}
describe('Shallow rendered Blog Link', () => {
    it('should render company and designation when everything set', () => {
        // Setup wrapper and assign props.
        const { enzymeWrapper, props } = shallowSetup({company:"TW",designation:"Sr Con"});
        // enzymeWrapper.find(selector) : Find every node in the render tree that matches the provided selector.
        expect(enzymeWrapper.find('#company').text()).toBe(props.details.company);
        expect(enzymeWrapper.find('#designation').text()).toBe(props.details.designation);
    });
    it('should not render anything if username is null', () => {
        // Setup wrapper and assign props.
        const { enzymeWrapper, props } = shallowSetup({username:null});
        expect(enzymeWrapper.find('#jobDetails').text()).toBe("");
    });
    it('should not render anything if details is null', () => {
        // Setup wrapper and assign props.
        const { enzymeWrapper, props } = shallowSetupNullDetails("atmaram");
        expect(enzymeWrapper.find('#jobDetails').text()).toBe("");
    });
});