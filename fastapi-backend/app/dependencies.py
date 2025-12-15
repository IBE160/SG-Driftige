from prisma import Prisma

# Dependency for Prisma client
async def get_db():
    db = Prisma()
    await db.connect()
    try:
        yield db
    finally:
        await db.disconnect()
