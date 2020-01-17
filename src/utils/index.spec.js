

import waitForExpect from 'wait-for-expect'

const debounce = require('./index').debounceCl();

describe('debounce', () => {
    test('debounce is debouncing a call', async() => {
        const cb = jest.fn();
        debounce(cb, 1);
        expect(cb).toHaveBeenCalledTimes(0);
        debounce(cb, 1);
        expect(cb).toHaveBeenCalledTimes(0);

        await waitForExpect(() => {
          expect(cb).toHaveBeenCalledTimes(1);
        })
    })

    test('debounce is running a call immediately', async() => {
      const cb = jest.fn();
      debounce(cb, 1, false);
      expect(cb).toHaveBeenCalledTimes(0);
      debounce(cb, 1, true);
      expect(cb).toHaveBeenCalledTimes(1);

      await waitForExpect(() => {
        expect(cb).toHaveBeenCalledTimes(1);
      })
  }, )
})