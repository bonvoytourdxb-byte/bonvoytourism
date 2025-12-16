import HeroCTR from "@/containers/Home/HeroCTR";
import InfoCTR from "@/containers/Home/InfoCTR"
import FindAdventureCTR from "@/containers/Home/FindAdventureCTR";
import TopTourCTR from "@/containers/Home/TopTourCTR";
import TopThreeCTR from "@/containers/Home/TopThreeCTR";
import ReviewCTR from "@/containers/Home/ReviewCTR";
import AllPackagesCTR from "@/containers/Home/AllPackagesCTR";

export default function Home() {
  return (
    <div>
      <div className="-mx-6 sm:-mx-10 md:-mx-14 lg:-mx-20">
        <HeroCTR />
      </div>
      <InfoCTR />
      <div className="-mx-6 sm:-mx-10 md:-mx-14 lg:-mx-20">
        <FindAdventureCTR
          mt="mt-12"
        />
      </div>
      <TopTourCTR />
      <div className="-mx-6 sm:-mx-10 md:-mx-14 lg:-mx-20">
        <TopThreeCTR />
      </div>
      <ReviewCTR />
      <div className="-mx-6 sm:-mx-10 md:-mx-14 lg:-mx-20">
        <AllPackagesCTR />
      </div>
    </div>
  );
}
