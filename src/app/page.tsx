import { PersonalIntroduction } from "./_components/personal-intro";

export default function Page() {
  return (
    // Add the width constraint wrapper div here
    <div className="w-full mx-auto">
      <PersonalIntroduction />
    </div>
  );
}
