# Wallet reconnect backoff

When reconnect retries are adjusted, capture the initial delay, maximum delay,
and reset condition in the release note so support can distinguish retry
throttling from wallet-provider downtime.
