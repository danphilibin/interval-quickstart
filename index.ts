import Interval from '@interval/sdk';

/*

Welcome to Interval!

This is a demo project where you can try Interval in your browser, no downloads or IDE required.

If you're looking at this, Interval is already running. View your actions here:

https://intervalkit.com/dashboard/develop/console

*/

const interval = new Interval({
  apiKey: process.env.INTERVAL_API_KEY,
  actions: {
    hello_world: async (io) => {
      const num = await io.input.number('Enter a number');

      const num2 = await io.input.number(`Enter a number greater than ${num}`, {
        min: num,
      });

      return { num, num2 };
    },

    // Here's an example of how you might use Interval in your app's codebase:
    create_customer_account: async (io) => {
      const [name, email, sendWelcomeEmail] = await io.group([
        io.input.text('Name'),
        io.input.email('Email address'),
        io.input.boolean('Send welcome email?', { defaultValue: true }),
      ]);

      // call a method from your app, e.g.
      // const user = await createUser({ name, email })

      if (sendWelcomeEmail) {
        // await mailer.send('welcome', { to: email, vars: { name } })
      }

      const [, enableInvoicing, enableGroups] = await io.group([
        io.display.heading('User created! Enable these features?'),
        io.input.boolean('Invoicing', { defaultValue: true }),
        io.input.boolean('User groups', { defaultValue: false }),
      ]);

      if (enableInvoicing) {
        // await setFeatureFlag(user.id, 'invoicing')
      }

      if (enableGroups) {
        // await setFeatureFlag(user.id, 'userGroups')
      }

      return { name, email };
    },
  },
});

interval.listen();
