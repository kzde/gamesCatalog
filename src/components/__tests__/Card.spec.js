import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../Card';

describe('Card', () => {
  it('should renders correctly', () => {
    const props = {
      cover: 'cover',
      title: 'card title',
      subTitle: 'sub title',
      handleClick: () => {}
    };
    const tree = renderer.create(<Card {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
