// require(`@testing-library/jest-dom/extend-expect`)

import enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';// React 16 enzyme adapter
enzyme.configure({ adapter: new Adapter() });// Make enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.mount = mount;