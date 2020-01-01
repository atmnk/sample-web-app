// ./**tests**/todo_component_test.js
import * as React from 'react';
import { shallow } from 'enzyme';
import {BlogEntry} from "../../components/BlogEntry";


function shallowSetup() {

    const props = {
        blog:{
            basic:{
                id:1,
                title:"Hello"
            }
        }
    }
    // wrapper instance around rendered output
    const enzymeWrapper = shallow(<BlogEntry blog={props.blog} />);

    return {
        props,
        enzymeWrapper
    };
}
describe('Shallow rendered Blog Link', () => {
    it('should render a Link with proper title', () => {
        // Setup wrapper and assign props.
        const { enzymeWrapper, props } = shallowSetup();
        // enzymeWrapper.find(selector) : Find every node in the render tree that matches the provided selector.
        expect(enzymeWrapper.find('a').hasClass('blogLink')).toBe(true);
        expect(enzymeWrapper.find('a').text()).toBe(props.blog.basic.title);
    });
    it('should render a Link with proper link', () => {
        // Setup wrapper and assign props.
        const { enzymeWrapper, props } = shallowSetup();
        const linkProps=enzymeWrapper.find('Link').props()
        expect(linkProps.href).toBe("/ui/blog/[id]");
        expect(linkProps.as).toBe("/ui/blog/"+props.blog.basic.id);
    });

});