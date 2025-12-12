from prisma import Prisma # Correct import statement

db = Prisma() # Use Prisma() directly

async def connect_to_db():
    print("Connecting to database...")
    await db.connect()
    print("Database connected.")

async def disconnect_from_db():
    print("Disconnecting from database...")
    await db.disconnect()
    print("Database disconnected.")