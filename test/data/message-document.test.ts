import Message from '../../src/data/message-document';

describe('Message Document Tests', () => {
  test('it should fail validation if name is missing', () => {
    const msg = new Message({
      email: '',
      message: '',
    });

    const err = msg.validateSync();

    expect(err?.errors['name'].message).toBe('Please enter your name');
  });

  test('it should fail validation if email is missing', () => {
    const msg = new Message({
      name: 'Fred Bloggs',
      email: '',
      message: '',
    });

    const err = msg.validateSync();

    expect(err?.errors['email'].message).toBe('Please enter your email');
  });

  test('it should fail validation if email is invalid', () => {
    const msg = new Message({
      name: 'Fred Bloggs',
      email: 'fred.bloggs',
      message: '',
    });

    const err = msg.validateSync();

    expect(err?.errors['email'].message).toBe('That is not a valid email address');
  });
  
  test('it should fail validation if message is missing', () => {
    const msg = new Message({
      name: 'Fred Bloggs',
      email: 'fred.bloggs@gmail.com',
      message: '',
    });

    const err = msg.validateSync();

    expect(err?.errors['message'].message).toBe('Please enter a message');
  });

  test('it should pass validation if all fields are supplied', () => {
    const msg = new Message({
      name: 'Fred Bloggs',
      email: 'fred.bloggs@gmail.com',
      message: 'Hello',
    });

    const err = msg.validateSync();

    expect(err).toBeUndefined();
  });

  test('timestamp should be set when a message is created', () => {
    const msg = new Message({
      name: 'Fred Bloggs',
      email: 'fred.bloggs@gmail.com',
      message: 'Hello',
    });

    expect(msg?.timestamp).not.toBeUndefined();
  });
});
