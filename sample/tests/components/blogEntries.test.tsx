// ./**tests**/todo_component_test.js
import * as React from 'react';
import { shallow } from 'enzyme';
import {BlogEntry} from "../../components/BlogEntry";
import {BlogEntries} from "../../components/BlogEntries";
import {BlogState} from "../../states/states";


function shallowSetup(blogs=[{
    basic:{
        id:1,
        title:"Hello"
    }
},{
    basic:{
        id:2,
        title:"Hi"
    }
}]) {
    const props = {
        blogs:blogs
    }
    // wrapper instance around rendered output
    const enzymeWrapper = shallow(<BlogEntries blogs={props.blogs} />);

    return {
        props,
        enzymeWrapper
    };
}
describe('Shallow rendered Blog Link', () => {
    it('should render proper number of Blogs', () => {
        // Setup wrapper and assign props.
        const { enzymeWrapper, props } = shallowSetup();
        expect(enzymeWrapper.find('BlogEntry').length).toBe(2)
    });
    it('should render proper props for BlogEntry', () => {
        // Setup wrapper and assign props.
        const { enzymeWrapper, props } = shallowSetup();
        expect(enzymeWrapper.find('BlogEntry').get(0).props.blog).toBe(props.blogs[0])
        expect(enzymeWrapper.find('BlogEntry').get(1).props.blog).toBe(props.blogs[1])
    });
    it('should render loading when no blogs', () => {
        // Setup wrapper and assign props.
        const { enzymeWrapper, props } = shallowSetup(null);
        expect(enzymeWrapper.find('BlogEntry').length).toBe(0)
        expect(enzymeWrapper.find('#blogEntries').text()).toBe("Loading..")
    });

});