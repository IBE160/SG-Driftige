import InputForm from '@/components/InputForm';

export default function InputPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8">
          Create a New Quiz
        </h1>
        <InputForm />
      </div>
    </main>
  );
}
