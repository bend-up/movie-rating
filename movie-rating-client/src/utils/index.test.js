import { dates } from './';

describe('Utils tests', () => {
  it('format invalid date', () => {
    expect(dates.getFormattedDate()).toEqual('');
    expect(dates.getFormattedDate(null)).toEqual('');
    expect(dates.getFormattedDate(undefined)).toEqual('');
  });

  it('format date to desired format', () => {
    expect(dates.getFormattedDate('2004-02-12T15:19:21+00:00')).toEqual(
      '12-02-2004'
    );
    expect(dates.getFormattedDate('2011-10-05T14:48:00.000Z')).toEqual(
      '05-10-2011'
    );
  });
});
