async function main() {
  const [{ bootstrap }] = await Promise.all([import('./bootstrap')]);
  await bootstrap();
}

main().catch(console.log);
