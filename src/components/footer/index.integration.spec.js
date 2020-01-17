import React from 'react';
import { Provider } from "react-redux"
import { act } from 'react-dom/test-utils';

import {uxInitialState} from 'src/reducers/root/ux'

import Footer from './index'

describe('Footer', () => {
    test('Footer locale is being fetched and rendered correctly', async () => {
      const store = mockStore({
        root:{ux: uxInitialState},
      });

      let  wrapper;

      // INFO: the way it must be done due to async set state update in locale fetch
      await act(async () => {
        wrapper = await mount(<Provider store={store}>
          <Footer />
        </Provider >);
      })
      // INFO: mandatory after async set state for new locale template vars to get updated
      wrapper.update()

      // locale fetch is done
      expect(wrapper.find('a')).toHaveLength(2);
      // locale fetch is done
      expect(wrapper.find('a').last().text()).not.toBeFalsy();
      expect(wrapper.html()).toMatchSnapshot();
    })

    test('locale switching works', async () => {

      const store = realStore();

      let  wrapper;

      // INFO: the way it must be done due to async set state update in locale fetch
      await act(async () => {
        wrapper = await mount(<Provider store={store}>
          <Footer />
        </Provider >);
      })
      // INFO: mandatory after async set state
      wrapper.update();

      // locale fetch is done
      expect(wrapper.find('a')).toHaveLength(2);
      // locale fetch is done
      const locale1LinkText = wrapper.find('a').last().text();
      expect(locale1LinkText).not.toBeFalsy();

      // updating locale to ja
      wrapper.find('button').last().simulate("click");
      await act(async () => await wrapper.update())
      wrapper.update();

      expect(wrapper.find('a')).toHaveLength(2);
      // new localized link text
      const locale2LinkText = wrapper.find('a').last().text();
      expect(locale2LinkText).not.toBeFalsy();
      expect(locale2LinkText).not.toEqual(locale1LinkText);
    })
  }
)