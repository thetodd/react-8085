import { test, expect } from '@playwright/experimental-ct-react';
import RegisterView from './RegisterView';

test.use({ viewport: { width: 500, height: 500 } });

test('should work', async ({ mount }) => {
  const component = await mount(<RegisterView name="A" value="aa" />);
  await expect(component).toContainText('Register');
});