Underline text input with gold focus ring and inline error/success states.

```jsx
<Input label="Email" type="email" placeholder="you@example.com"
  error={touched && !valid ? 'Please enter a valid email.' : null} />
<Input label="Name" tone="dark" /> {/* footer / dark surface */}
```

Pass `tone="dark"` on the wood footer. `error` shows red + role=alert; `success` shows green.
